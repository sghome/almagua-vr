'use strict';

/* global THREE, navigator */

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const camera = new THREE.PerspectiveCamera(2.5, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;
  camera.position.y = 5;

  const controls = new THREE.OrbitControls(camera, canvas);

  const scene = new THREE.Scene();

  // Ambient Lighting
  const light = new THREE.AmbientLight(0x404040, 10);
  light.castShadows = true;
  scene.add(light);

  const gltfLoader = new THREE.GLTFLoader();
  gltfLoader.load('https://cdn.glitch.global/bc9e29ba-1909-42ee-b83b-b1246375e094/almagua.glb', (gltf) => {
    const root = gltf.scene;
    scene.add(root);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(root);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    controls.autoRotate = true;
    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  // Check if the browser supports the required APIs
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Access the user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        const videoTexture = new THREE.VideoTexture(stream);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBFormat;

        const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });

        const videoPlaneGeometry = new THREE.PlaneGeometry(16 / 9, 1.5);
        const videoPlaneMesh = new THREE.Mesh(videoPlaneGeometry, videoMaterial);
        videoPlaneMesh.position.z = -10;
        scene.add(videoPlaneMesh);

        render();
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
        render();
      });
  } else {
    console.error('getUserMedia is not supported');
    render();
  }
}

main();











var target = document.getElementsByClassName("instagram");

target[0].innerHTML = '<div class="display"><div class="logo"><div class="container"><div class="camera"><div class="flash"></div><div class="lens"></div></div></div></div><div class="text"><div class="text-container">Follow</div></div></div>';





//
//



