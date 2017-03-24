export default (flag) => {
    const name = flag.name;
    if (!name.match(/\//)) flag.remove();
}