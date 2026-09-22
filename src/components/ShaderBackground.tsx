import { useEffect, useRef } from 'react'

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 center = vec2(0.5 * (u_resolution.x / u_resolution.y), 0.5);
    vec2 pos = st - center;
    float dist = length(pos);
    float angle = atan(pos.y, pos.x);

    float mouseDistance = distance(u_mouse / u_resolution, vec2(0.5));
    float wave1 = sin(dist * 18.0 - u_time * 1.8 + sin(angle * 4.0) + mouseDistance * 2.0) * 0.5 + 0.5;
    float wave2 = cos(dist * 28.0 - u_time * 2.4 - angle * 3.0) * 0.5 + 0.5;
    float harmonics = smoothstep(0.4, 0.6, (wave1 + wave2) * 0.5);

    vec3 bg = vec3(0.035, 0.04, 0.06);
    vec3 deepCyan = vec3(0.0, 0.35, 0.42);
    vec3 brightTeal = vec3(0.0, 0.85, 0.95);
    vec3 glow = vec3(0.12, 0.95, 0.82);

    float vignette = 1.0 - smoothstep(0.1, 0.95, length(st - center));
    float beam = exp(-dist * 2.2) * (0.6 + 0.4 * sin(u_time * 1.2));

    vec3 color = mix(bg, deepCyan * 0.3, beam * 0.8);
    color += brightTeal * harmonics * beam * 0.45;
    color += glow * pow(beam, 3.0) * 0.35;
    color *= vignette;

    gl_FragColor = vec4(color, 0.85);
  }
`

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    if (!buffer) return
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse')
    const mouse = { x: 0, y: 0 }

    const syncSize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.max(1, Math.floor(canvas.clientWidth * pixelRatio))
      const height = Math.max(1, Math.floor(canvas.clientHeight * pixelRatio))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * canvas.width
      mouse.y = (1 - (event.clientY - rect.top) / rect.height) * canvas.height
    }

    const resizeObserver = new ResizeObserver(syncSize)
    resizeObserver.observe(canvas)
    window.addEventListener('pointermove', handlePointerMove)
    syncSize()

    let animationFrame = 0
    const render = (timestamp: number) => {
      syncSize()
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, timestamp * 0.001)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform2f(mouseLocation, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animationFrame = requestAnimationFrame(render)
    }
    animationFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full opacity-40 pointer-events-none" />
}
