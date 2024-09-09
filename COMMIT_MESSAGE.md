# Commit Message Conventions

Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the commit id of the commit being reverted.

### Type

The type of the commit message indicates the category of changes being introduced. Use one of the following types:

- **feat**: A new feature.
- **fix**: A bug fix.
- **docs**: Documentation changes only.
- **style**: Code style changes (formatting, missing semi-colons, etc.) that do not affect functionality.
- **refactor**: Code refactoring without fixing bugs or adding features.
- **test**: Adding or correcting tests.
- **chore**: Miscellaneous tasks such as updating build tasks, dependencies, etc.

### Subject

The subject is a brief summary of the changes. It should:

- Be written in the imperative mood (e.g., "Add feature" instead of "Added feature").
- Be no longer than 50 characters.
- Start with a lowercase letter.
- Avoid punctuation at the end.


### Body (Optional)

The body is used to provide additional details about the commit. It can include:

- What changes were made and why.
- Any side effects or consequences of the changes.
- Information related to backward compatibility.
  
If your commit is self-explanatory, the body can be omitted.

#### Example:
````
feat: implement search functionality for anime series 
fix: handle edge cases in anime episode fetching 
docs: update README with setup instructions 
refactor: optimize video streaming logic for better performance test: add unit tests for user authentication logic
````
 
