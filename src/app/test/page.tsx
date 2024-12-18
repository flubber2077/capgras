/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { LegacyRef, MutableRefObject, useEffect, useRef } from 'react'
import {
  useMousePosition,
  useWindowDimensions,
  useRequestAnimationFrameLoop
} from './utils'

export default function Test() {
  return <>{GenerativeArt({})}</>
}

function GenerativeArt({ numRows = 150, numCols = 150 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useMousePosition()
  const { width, height } = useWindowDimensions()

  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const hasBeenInitialized = useRef(false)

  useEffect(() => {
    if (!canvasRef.current) return

    contextRef.current = canvasRef.current.getContext('2d')
    // When we first create the canvas, we need to scale it up to match the device pixel ratio. We only want to do this once, which is a problem with Strict Mode, and with Hot Reload. So we’ll track this in a ref, and skip the work if it’s already been performed.
    if (!hasBeenInitialized.current && contextRef.current) {
      contextRef.current.scale(devicePixelRatio, devicePixelRatio)
      hasBeenInitialized.current = true
    }
  }, [])

  useRequestAnimationFrameLoop(() => {
    draw(contextRef, mousePosition, width!, height!, numRows, numCols)
  })

  return (
    <canvas
      ref={canvasRef}
      className="absolute"
      width={width}
      height={height}
    />
  )
}

type CanvasBox = { width: number; height: number }
type Location = { x: number; y: number }

function draw(
  contextRef: MutableRefObject<CanvasRenderingContext2D | null>,
  mousePosition = { x: 0, y: 0 },
  width: number,
  height: number,
  distanceX: number,
  distanceY?: number
) {
  const ctx = contextRef.current

  const numRows = Math.floor(width / distanceX)
  const numCols = Math.floor(height / (distanceY || distanceX))

  if (!ctx) {
    return
  }
  ctx.clearRect(0, 0, width, height)
  const xOffset = Math.floor(width / numRows / 2)
  const yOffset = Math.floor(height / numCols / 2)
  const distanceMultiplier = 0.01
  const pupilDistance = 9

  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    for (let colIndex = 0; colIndex < numCols; colIndex++) {
      const x = normalize(rowIndex, 0, numRows, 0, width) + xOffset
      const y = normalize(colIndex, 0, numCols, 0, height) + yOffset
      const deltaX = x - mousePosition.x
      const deltaY = y - mousePosition.y
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

      ctx.beginPath()
      ctx.arc(
        x -
          clamp(
            deltaX * distance * distanceMultiplier,
            -1 * pupilDistance,
            pupilDistance
          ),
        y -
          clamp(
            deltaY * distance * distanceMultiplier,
            -1 * pupilDistance,
            pupilDistance
          ),
        20,
        0,
        2 * Math.PI
      )
      ctx.fill()
      ctx.closePath()
      ctx.beginPath()
      ctx.arc(x, y, 30, 0, 2 * Math.PI)
      ctx.stroke()
    }
  }
}

type CanvasReturn = {
  ctx: CanvasRenderingContext2D
  canvasRef: LegacyRef<HTMLCanvasElement>
  canvasProps: object
  canvasBox: CanvasBox
}

const normalize = (
  number: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin = 0,
  newScaleMax = 1
): number => {
  // FIrst, normalize the value between 0 and 1.
  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin)

  // Next, transpose that value to our desired scale.
  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin
}

const clamp = (value: number, min = 0, max = 1) => {
  // We might be passing in "inverted" values, eg:
  //    clamp(someVal, 10, 5);
  //
  // This is especially common with `clampedNormalize`.
  // In these cases, we'll flip the min/max so that the function works as expected.
  const actualMin = Math.min(min, max)
  const actualMax = Math.max(min, max)

  return Math.max(actualMin, Math.min(actualMax, value))
}
