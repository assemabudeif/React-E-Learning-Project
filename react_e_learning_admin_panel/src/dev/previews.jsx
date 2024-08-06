import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import App from "../App";
import HomePage from "../Pages/HomePage";
import AppBarComp from "../Componentes/AppBarComp";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/HomePage">
                <HomePage/>
            </ComponentPreview>
            <ComponentPreview path="/AppBarComp">
                <AppBarComp/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews