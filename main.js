import * as THREE from 'three';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Position the camera
camera.position.set(0, 0, 5);

// Get the camera feed
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    // Create a texture from the video feed
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    // Create a plane to display the video feed
    const geometry = new THREE.PlaneGeometry(5, 5);
    const material = new THREE.MeshBasicMaterial({ map: videoTexture });
    const videoPlane = new THREE.Mesh(geometry, material);
    scene.add(videoPlane);
  })
  .catch((error) => {
    console.error('Error accessing camera:', error);
  });