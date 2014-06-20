CURRENTDIR="`pwd`"
DEFAULT_FULLNAME="`git config user.name`"
DEFAULT_EMAIL="`git config user.email`"

read -p "Enter name: ($DEFAULT_FULLNAME)" FULLNAME
read -p "Email: ($DEFAULT_EMAIL)" EMAIL

read -r -p  -n 1 "Would you like to create a GitHub repo (y/n)? " DO_GITHUB
echo
if [[ $DO_GITHUB =~ ^[Yy]$ ]]
then
    read -p "Name of Github repo: " GITHUB_REPO
    read -p "GitHub Username: " GITHUB_USER
    read -p "GitHub Password: " GITHUB_PWD
fi

rm -f $CURRENTDIR/start.sh
rm -rf $CURRENTDIR/.git

git init
git add .
git commit -m "initial commit"

if [[ $DO_GITHUB =~ ^[Yy]$ ]]
then
    curl -u "$GITHUB_USER:$GITHUB_PWD" https://api.github.com/user/repos -d '{"name":"$GITHUB_REPO"}'
    git remote add origin git@github.com:$GITHUB_USER/GITHUB_REPO.git
    git push origin master
fi
