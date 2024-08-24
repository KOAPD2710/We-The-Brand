import * as THREE from 'three';

export const Texture = THREE.Texture;

export const SharedProps = {
    blend: undefined,
    intensity: undefined,
    distortion: undefined,
    rainbow: undefined,
    fluidColor: undefined,
    backgroundColor: undefined,
    showBackground: undefined
};

export const Props = {
    ...SharedProps,
    densityDissipation: undefined,
    pressure: undefined,
    velocityDissipation: undefined,
    force: undefined,
    radius: undefined,
    curl: undefined,
    swirl: undefined
};

export const EffectProps = {
    ...SharedProps,
    tFluid: null
};