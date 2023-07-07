
const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
]

const RandomTheme = ({setTheme}) => {

    const handleRandomTheme = (e) => {
        e.preventDefault()
        setTheme(themes[Math.floor(Math.random() * themes.length)])
    }

    return <button className="btn bg-base-100 shadow-lg" onClick={handleRandomTheme}>Random Theme</button>
}

export default RandomTheme