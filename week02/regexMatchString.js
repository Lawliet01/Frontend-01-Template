const regex = /^("[^".*]*"|'[^'.*]*')$/;

console.log(regex.test(`"f'"`));
console.log(regex.test(`'f"_[[;]]'`));
