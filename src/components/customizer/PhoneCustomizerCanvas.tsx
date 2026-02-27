"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Group } from 'react-konva';
import useImage from 'use-image';

export default function PhoneCustomizerCanvas({
    width = 280,
    height = 580,
    uploadedImage,
}: any) {

    const [userImg] = useImage(uploadedImage);

    const [imageProps, setImageProps] = useState({
        x: 0,
        y: 0,
        width: 200,
        height: 300,
    });

    const centerImage = useCallback(() => {
        if (userImg) {
            const scale = Math.max(width / userImg.width, height / userImg.height);
            setImageProps({
                x: width / 2 - (userImg.width * scale) / 2,
                y: height / 2 - (userImg.height * scale) / 2,
                width: userImg.width * scale,
                height: userImg.height * scale,
            });
        }
    }, [userImg, width, height]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            centerImage();
        }
        return () => { mounted = false; };
    }, [centerImage]);

    return (
        <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden" style={{ width, height }}>
            {/* Background/Base of the phone case - Placeholder */}
            <div className="absolute inset-0 bg-white"></div>

            {/* The Konva Stage */}
            <Stage width={width} height={height} className="absolute inset-0 z-10 cursor-move">
                <Layer>

                    {/* Group handling the mask */}
                    <Group clipFunc={(ctx) => {
                        // Temporary clipping mask if deviceMaskUrl isn't functional (rounding corners)
                        ctx.beginPath();
                        ctx.moveTo(40, 0);
                        ctx.lineTo(width - 40, 0);
                        ctx.quadraticCurveTo(width, 0, width, 40);
                        ctx.lineTo(width, height - 40);
                        ctx.quadraticCurveTo(width, height, width - 40, height);
                        ctx.lineTo(40, height);
                        ctx.quadraticCurveTo(0, height, 0, height - 40);
                        ctx.lineTo(0, 40);
                        ctx.quadraticCurveTo(0, 0, 40, 0);
                        ctx.closePath();
                    }}>
                        {userImg && (
                            <KonvaImage
                                image={userImg}
                                {...imageProps}
                                draggable
                                onDragEnd={(e) => {
                                    setImageProps({
                                        ...imageProps,
                                        x: e.target.x(),
                                        y: e.target.y(),
                                    });
                                }}
                            />
                        )}
                    </Group>

                </Layer>

                {/* Overlay Layer (Camera hole, buttons reflections) */}
                <Layer listening={false}>
                    {/* Fake Camera Hole Placeholder */}
                    <Rect
                        x={20} y={20} width={80} height={80}
                        cornerRadius={20}
                        fill="rgba(0,0,0,0.8)"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth={2}
                    />
                    {/* Fake Dynamic Island or Top Cutout */}
                    <Rect
                        x={width / 2 - 40} y={15} width={80} height={20}
                        cornerRadius={10}
                        fill="black"
                    />
                </Layer>
            </Stage>

        </div>
    );
}
