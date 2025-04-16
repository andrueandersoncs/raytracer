# JavaScript Ray Tracer

A simple and elegant ray tracer built with pure JavaScript. This project implements a basic ray tracing engine that renders 3D scenes directly in your browser.

## Features

- Pure JavaScript implementation with no rendering dependencies
- Vector math utilities with memoization for performance
- Ray-sphere intersection calculations
- Camera with adjustable parameters
- Anti-aliasing through multi-sampling
- Real-time rendering to HTML canvas

## Getting Started

### Prerequisites

- Node.js (latest stable version recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd raytracer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local development server (usually http://localhost:1234)

## How It Works

The ray tracer works by simulating the physical behavior of light. For each pixel:

1. Rays are cast from a virtual camera through the pixel
2. Intersections with objects in the scene are calculated
3. Lighting calculations determine the color of each pixel
4. The final image is rendered to an HTML canvas

## Project Structure

- `src/vector.js` - Vector math operations with memoization
- `src/ray.js` - Ray representation and ray-color calculations
- `src/camera.js` - Camera model and rendering pipeline
- `src/sphere.js` - Sphere geometry and intersection logic
- `src/hittable.js` - Abstract interface for scene objects
- `src/functional.js` - Functional programming utilities
- `src/interval.js` - Range checking utilities
- `src/index.js` - Main application and scene setup

## Future Enhancements

- Materials and textures
- Additional geometric primitives
- Global illumination
- Reflection and refraction
- Multi-threading with Web Workers
- Scene file loading

## License

This project is licensed under the ISC License - see the package.json file for details.

---

_A project exploring the beauty of computer graphics and the elegance of ray tracing algorithms._
