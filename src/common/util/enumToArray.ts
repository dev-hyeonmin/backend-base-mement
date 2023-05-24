export const enumToArray = (enumme) => {
    return Object.keys(enumme)
        .map(key => enumme[key]);
}