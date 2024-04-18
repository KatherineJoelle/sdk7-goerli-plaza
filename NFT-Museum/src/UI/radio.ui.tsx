import { UiCanvasInformation, engine } from "@dcl/sdk/ecs";
import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity, Button } from "@dcl/sdk/react-ecs";
import { openRadio, toggleRadio } from "../Audio/radio";
import { tieredFontScale, wordWrap } from "../helperFunctions";
import { pauseIcon, playIcon } from "./ui";
import { radioPlaying } from "../Audio/radio";

// Set Radio to 'true' to show the radio UI:
let RadioUI: Boolean = true

let radioStationName = '24 House Radio'
let radioStationNameWrap = wordWrap(radioStationName, 14, 3)
let textColor = Color4.White()
let smallFont = 10

export function radioUI() {
    if (RadioUI) {
        const canvasHeight = UiCanvasInformation.get(engine.RootEntity).height;

        return (
            <UiEntity
                key={'radio-main'}
                uiTransform={{
                    height: `${canvasHeight * 0.08}`,
                    width: `${canvasHeight * 0.08}`,
                    positionType: 'absolute',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: 4,
                    position: {
                        top: '8%',
                        right: '0%',
                        bottom: '0%',
                        left: '96%'
                    },
                    maxWidth: 100,
                    maxHeight: 200
                }}
            >
                <UiEntity key={'radio-space'}
                    uiTransform={{
                        margin: '0 0 0 0',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    <Button key={'radio-button'}
                        uiTransform={{
                            width: `${canvasHeight * 0.075}`,
                            height: `${canvasHeight * 0.02}`,
                            margin: '0 0 15 0' // space between buttons
                        }}
                        value={radioStationNameWrap}
                        variant='primary'
                        fontSize={smallFont * tieredFontScale}
                        color={textColor}
                        onMouseDown={openRadio}
                    />
                    <Button key={'radio-toggle'}
                        uiTransform={{
                            width: `${canvasHeight * 0.035}`,
                            height: `${canvasHeight * 0.035}`,
                            margin: '-5 0 0 0'
                        }}
                        value=''
                        variant='secondary'
                        fontSize={24 * tieredFontScale}
                        color={textColor}
                        uiBackground={{
                            textureMode: 'nine-slices',
                            texture: {
                                src: radioPlaying ? pauseIcon : playIcon,
                            },
                            textureSlices: {
                                top: -0.0,
                                bottom: -0.0,
                                left: -0.0,
                                right: -0.0,
                            },
                        }}
                        onMouseDown={toggleRadio}
                    />
                </UiEntity>
            </UiEntity>
        );
    } else {
        return null; 
    }
}
