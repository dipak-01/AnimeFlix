# AnimeFlix

AnimeFlix is a streaming website where you can watch your favorite anime series and movies.

## Screenshots

![Screenshot 1](/assets/page1.png)

![Screenshot 2](/assets/page2.png)

## Features

- Anime streaming
- Ongoing anime schedule
- Anime information
- Anime search
- Community 
- Sorted anime as top upcoming, trending, most popular
- Watch Together (upcoming feature)

## Run Locally

Clone the project

```bash
git clone https://github.com/dipak-01/AnimeFlix.git
```

Go to the project directory

```bash
cd AnimeFlix/Animeflix_Frontend
```
Create a .env file and copy the contents of .env.example into it.

```bash
VITE_ANIME_URL= 
VITE_ANIME_URL_SECONDARY= 
VITE_BACKEND_SERVER_PORT= 
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```


# Contributing Guidelines  

When contributing to this repository, please first discuss the change you wish to make via an issue.

## Submitting or Requesting an Issue/Enhancement

### Best Practices for reporting or requesting for Issues/Enhancements:
  - Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.
  - Follow the Issue Template while creating the issue.
  - Include Screenshots if any (specially for UI related issues).
  - For UI enhancements or workflows, include mockups to get a clear idea.

### Best Practices for getting assigned to work on an Issue/Enhancement:
- If you would like to work on an issue, inform in the issue ticket by commenting on it.
- Please be sure that you are able to reproduce the issue, before working on it. If not, please ask for clarification by commenting or asking the issue creator.

**Note:** Please do not work on an issue which is already being worked on by another contributor. We don't encourage creating multiple pull requests for the same issue. Also, please allow the assigned person at least 2 days to work on the issue (The time might vary depending on the difficulty). If there is no progress after the deadline, please comment on the issue asking the contributor whether he/she is still working on it. If there is no reply, then feel free to work on the issue.


## Submitting a Pull Request

### Best Practices to send Pull Requests:
  - Fork the [project](https://github.com/dipak-01/AnimeFlix) on GitHub
  - Clone the project locally into your system.
```
git clone https://github.com/dipak-01/AnimeFlix.git
```
  - Make sure you are in the `main` branch, Change directory to AnimeFlix/Animeflix_Frontend.
```
git checkout main
```
  - Create a new branch with a meaningful name before adding and committing your changes.
```
git checkout -b branch-name
```
  - Add the files you changed. (avoid using `git add .`)
```
git add file-name
```
  - Follow the style conventions for a [meaningful commit message](COMMIT_MESSAGE.md).
```
git commit
```
  - Push this branch to your remote repository on GitHub.
```
git push origin branch-name
```
  - Follow the Pull request template and submit a pull request with a motive for your change and the method you used to achieve it to be merged with the `main` branch.
  - If you can, please submit the pull request with the fix or improvements including tests.
  - During review, if you are requested to make changes, rebase your branch and squash the multiple commits into one. Once you push these changes the pull request will edit automatically.


## Configuring remotes
When a repository is cloned, it has a default remote called `origin` that points to your fork on GitHub, not the original repository it was forked from. To keep track of the original repository, you should add another remote called `upstream`.

1. Set the `upstream`.
```
git remote add upstream https://github.com/openMF/web-app.git
```
2. Use `git remote -v` to check the status. The output must be something like this:
```
  > origin    https://github.com/your-username/AnimeFlix.git (fetch)
  > origin    https://github.com/your-username/AnimeFlix.git (push)
  > upstream  https://github.com/dipak-01/AnimeFlix.git (fetch)
  > upstream  https://github.com/dipak-01/AnimeFlix.git (push)
```
3. To update your local copy with remote changes, run the following: (This will give you an exact copy of the current remote. You should not have any local changes on your main branch, if you do, use rebase instead.)
```
git fetch upstream
git checkout main
git merge upstream/main
```
4. Push these merged changes to the main branch on your fork. Ensure to pull in upstream changes regularly to keep your forked repository up to date.
```
git push origin main
```
5. Switch to the branch you are using for some piece of work.
```
git checkout branch-name
```
6. Rebase your branch, which means, take in all latest changes and replay your work in the branch on top of this - this produces cleaner versions/history.
```
git rebase main
```
7. Push the final changes when you're ready.
```
git push origin branch-name
```

## After your Pull Request is merged
After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository.

1. Delete the remote branch on GitHub.
```
git push origin --delete branch-name
```
2. Checkout the main branch.
```
git checkout main
```
3. Delete the local branch.
```
git branch -D branch-name
```
4. Update your main branch with the latest upstream version.
```
git pull upstream main
```


## Feedback

If you have any feedback, please reach out to us at deepakkurkutedk007@gmail.com

## Credits

- [@ghoshRitesh12](https://www.github.com/ghoshRitesh12) for the API
- [@hianime](https://hianime.to/)
- [@Zeddxx](https://www.github.com/Zeddxx) for inspiring me
