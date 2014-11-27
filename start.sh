CURRENTDIR="`pwd`"
DO_GITHUB=false
DO_BITBUCKET=false

###############

echo

read -p "what is your full name: " FULL_NAME
read -p "what is your email address: " EMAIL
echo

echo "which license would you like to use for this new project?"
echo " (1) MIT"
echo " (2) GPLv3"
echo " (3) Apache"
echo " (4) none, or I will add it later"
read -r -p "selection: " -n 1 LICENSE_TYPE
echo
echo

read -r -p "would you like to create a new remote repo (y/n)? " -n 1 DO_REMOTE
echo
if [[ $DO_REMOTE =~ ^[Yy]$ ]]; then
    read -r -p "(g)ithub or (b)itbucket? " -n 1 REMOTE_TYPE
    echo
    if [[ "$REMOTE_TYPE" =~ ^[Gg]$ ]]; then
        DO_GITHUB=true
    else
        DO_BITBUCKET=true
    fi

    read -p "name of repo: " REPO_NAME
    read -p "username: " USERNAME
    read -s -p "password: " PASSWORD
    echo
fi
echo

echo "which continuous integration service will you be using?"
echo " (1) travis-ci.com"
echo " (2) wercker.com"
echo " (3) neither"
echo " (4) keep both config files, I'm not sure yet"
read -r -p "selection: " -n 1 CI_SELECTION
echo
echo

###############

echo -n "cleaning up... "

rm -f $CURRENTDIR/start.sh
rm -f $CURRENTDIR/README.md
rm -f $CURRENTDIR/LICENSE
rm -rf $CURRENTDIR/.git

echo "OK"

###############

echo -n "configuring... "

PROJECT_NAME=$(basename $(pwd))
sed -i "" "s/__NAME__/$FULL_NAME/g" ./package.json
sed -i "" "s/__EMAIL__/$EMAIL/g" ./package.json
sed -i "" "s/__PROJECT_NAME__/$PROJECT_NAME/g" ./package.json

if [[ $LICENSE_TYPE = "1" ]]; then
    cp LICENSE.mit LICENSE
    sed -i "" "s/%LICENSE%/MIT/g" ./package.json
elif [[ $LICENSE_TYPE = "2" ]]; then
    cp LICENSE.gpl LICENSE
    sed -i "" "s/%LICENSE%/GPLv3/g" ./package.json
elif [[ $LICENSE_TYPE = "3" ]]; then
    cp LICENSE.apache LICENSE
    sed -i "" "s/%LICENSE%/Apache/g" ./package.json
else
    sed -i "" "s/%LICENSE%//g" ./package.json
fi

rm -f LICENSE.*

if [[ $CI_SELECTION = "1" ]]; then
    rm ./wercker.yml
elif [[ $CI_SELECTION = "2" ]]; then
    rm ./.travis.yml
elif [[ $CI_SELECTION = "3" ]]; then
    rm -f ./wercker.yml ./.travis.yml
fi

if [[ $LICENSE_TYPE =~ ^[1-3]$ ]]; then
    YEAR=$(date +"%Y")
    sed -i "" "s/__YEAR__/$YEAR/g" ./LICENSE
    sed -i "" "s/__NAME__/$FULL_NAME/g" ./LICENSE
    sed -i "" "s/__EMAIL__/$EMAIL/g" ./LICENSE
fi

echo "OK"

###############

echo -n "initializing git... "

git init > /dev/null
git add . > /dev/null
git commit -m "initial commit" > /dev/null

echo "OK"

###############

if $DO_GITHUB; then
    echo -n "creating github repository... "
    GITHUB_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -u "$USERNAME:$PASSWORD" https://api.github.com/user/repos -d '{"name":"'"$REPO_NAME"'"}')
    if [ "$GITHUB_RESPONSE" == "201" ]; then
        echo "OK"
        echo -n "pushing to github... "
        git remote add origin git@github.com:$USERNAME/$REPO_NAME.git > /dev/null
        git push origin master -q
        echo "OK"
    else
        echo "FAILURE"
        echo "  http response code $GITHUB_RESPONSE"
    fi
fi

###############

if $DO_BITBUCKET; then
    echo -n "creating bitbucket repository... "
    BITBUCKET_RESPONSE=$(curl -s -o /dev/null -X POST -u "$USERNAME:$PASSWORD" -w "%{http_code}" https://api.bitbucket.org/2.0/repositories/$USERNAME/$REPO_NAME -d '{"scm": "git", "is_private": true}')
    if [ "$BITBUCKET_RESPONSE" == "200" ]; then
        echo "OK"
        echo -n "pushing to bitbucket... "
        git remote add origin git@bitbucket.org:$USERNAME/$REPO_NAME.git
        git push origin master -q
        echo "OK"
    else
        echo "FAILURE"
        echo "  http response code $BITBUCKET_RESPONSE"
    fi
fi

###############
