import './src/components/NavBar.js'
import './src/components/MainContent.js'
import './src/components/CardImage.js'
import './src/components/WrapTable.js'
import main from './src/view/main.js'
import club from './src/view/club.js'


document.getElementById('index') 
? document.addEventListener('DOMContentLoaded', main) 
: document.addEventListener('DOMContentLoaded', club)