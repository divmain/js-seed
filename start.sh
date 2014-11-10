CURRENTDIR="`pwd`"
DO_GITHUB=false
DO_BITBUCKET=false

###############

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

# echo "does your project have,"
# echo " (1) a browser-based component,"
# echo " (2) a Node.js-based component, or"
# echo " (3) both?"
# read -r -p "> " -n 1 PROJECT_TYPE

###############

# if [ "$PROJECT_TYPE" == "1" ]; then
#     # TODO: switch to browser-only branch
# fi

# if [ "$PROJECT_TYPE" == "2" ]; then
#     # TODO: switch to node-only branch
# fi

###############

echo -n "cleaning up... "

rm -f $CURRENTDIR/start.sh
rm -f $CURRENTDIR/README.md
rm -f $CURRENTDIR/LICENSE
rm -rf $CURRENTDIR/.git
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

## TODO: run `npm install`
