CURRENTDIR="`pwd`"

###############

read -r -p "would you like to create a new github repo (y/n)? " -n 1 DO_GITHUB
echo
if [[ $DO_GITHUB =~ ^[Yy]$ ]]; then
    read -p "name of repo: " GITHUB_REPO
    read -p "github username: " GITHUB_USER
    read -s -p "github password: " GITHUB_PWD
fi

###############

echo -n "cleaning up... "

rm -f $CURRENTDIR/start.sh
rm -rf $CURRENTDIR/.git
echo "OK"

###############

echo -n "initializing git... "

git init > /dev/null
git add . > /dev/null
git commit -m "initial commit" > /dev/null

echo "OK"

###############

if [[ $DO_GITHUB =~ ^[Yy]$ ]]; then
    echo -n "creating github repository... "
    GITHUB_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -u "$GITHUB_USER:$GITHUB_PWD" https://api.github.com/user/repos -d '{"name":"'"$GITHUB_REPO"'"}')
    if [ "$GITHUB_RESPONSE"="201" ]; then
        echo "OK"
        echo -n "pushing to github... "
        git remote add origin git@github.com:$GITHUB_USER/$GITHUB_REPO.git > /dev/null
        git push origin master -q
        echo "OK"
    else
        echo "FAILURE"
        echo "  http response code $GITHUB_RESPONSE"
    fi
fi
