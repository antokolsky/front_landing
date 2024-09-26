import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";

// config
const cfg = {
    backgroundColor: 0x101020,
    wireframeColor: 0x777777,
    materialColor: 0xCCCCCC,
    sphereLightColor: 0xFFFFFF, //0x080820
    sphereLightPower: 0.2,
    spotLightColor: 0xFFFFFF,
    spotLightPower: 1,
    rotateSpeed: 0.5,
    enableDamping: true,
    dampingFactor: 0.1,
    autoRotate: true,
    autoRotateSpeed: 0.5,
};

const STLViewer = async (elem, model) => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const camera = new THREE.PerspectiveCamera(50, elem.clientWidth / elem.clientHeight, 1, 1000);
    const loader = new STLLoader();
    
    renderer.setSize(elem.clientWidth, elem.clientHeight);
    elem.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
        renderer.setSize(elem.clientWidth, elem.clientHeight);
        renderer.setClearColor(cfg.backgroundColor, 1);
        camera.aspect = elem.clientWidth / elem.clientHeight;
        camera.updateProjectionMatrix();
    }, false);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = cfg.rotateSpeed;
    controls.enableDamping = cfg.enableDamping;
    controls.dampingFactor = cfg.dampingFactor;
    controls.autoRotate = cfg.autoRotate;
    controls.autoRotateSpeed = cfg.autoRotateSpeed;

    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(cfg.sphereLightColor, cfg.sphereLightColor, cfg.sphereLightPower));

    const addLight = (param) => {
        const {x, y, z} = param;
        const object3d  = new THREE.DirectionalLight(cfg.spotLightColor, cfg.spotLightPower);
        object3d.position.set(x,y,z);
        object3d.name = 'Key light';
        scene.add(object3d);
    };

    const spotLights = [
        {x: 100, y: 100, z: 100},
        {x: -100, y: 100, z: 100},
        {x: 100, y: -100, z: 100},
        {x: -100, y: -100, z: 100},
        {x: 100, y: 100, z: -100},
        {x: -100, y: 100, z: -100},
        {x: 100, y: -100, z: -100},
        {x: -100, y: -100, z: -100},
    ];

    spotLights.forEach(l => addLight(l));

    const element = document.createElement('div');
    element.classList.add("loader");
    elem.insertAdjacentElement("afterBegin", element);

    const onProgress = e => {
        let text = parseFloat(e.loaded / e.total * 100).toFixed(2) + '% loaded';
        if (e.loaded === e.total) {
            text = "Rendering ...";
        }
        element.textContent = text;
    }

    let geometry = new THREE.Object3D();
    await loader.loadAsync(model, onProgress).then((stl) => {
        geometry = stl.scene;
    });

    loader.load(model, (geometry) => {
        elem.removeChild(element);
        const material = new THREE.MeshLambertMaterial({color: cfg.materialColor});
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const middle = new THREE.Vector3();
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(middle);

        mesh.position.x = -1 * middle.x;
        mesh.position.y = -1 * middle.y;
        mesh.position.z = -1 * middle.z;

        const largestDimension = Math.max(
          geometry.boundingBox.max.x,
          geometry.boundingBox.max.y,
          geometry.boundingBox.max.z
        );
        camera.position.z = largestDimension * 1.5;

        const wireframe = new THREE.WireframeGeometry(geometry);
        const line = new THREE.LineSegments(wireframe);
        line.material.color.setHex(cfg.wireframeColor);
        scene.add(line);

        line.position.x = mesh.position.x;
        line.position.y = mesh.position.y;
        line.position.z = mesh.position.z;

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    });
}

export const STLViewerEnable = (classname) => {
    const rootPath = process.env.NODE_ENV === 'development' ? "./front_landing/" : "./";
    const models = document.getElementsByClassName(classname);
    for (let m of models) {
      STLViewer(m, `${rootPath}${m.getAttribute("data-src")}`);
    }
}
