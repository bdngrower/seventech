"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImage, Group } from 'react-konva';
import useImage from 'use-image';

interface PhoneCustomizerCanvasProps {
    width?: number;
    height?: number;
    uploadedImage: string | null;
    caseColor?: string;
}

export default function PhoneCustomizerCanvas({
    width = 260,
    height = 520,
    uploadedImage,
    caseColor = "#1a1a1a",
}: PhoneCustomizerCanvasProps) {

    const [userImg] = useImage(uploadedImage || "");

    const [imageProps, setImageProps] = useState({
        x: 0,
        y: 0,
        width: 200,
        height: 400,
    });

    // Phone case dimensions (printable area inside the case)
    const caseRadius = 36;
    const printAreaPadding = 16;
    const printX = printAreaPadding;
    const printY = printAreaPadding + 50; // top offset for camera
    const printW = width - printAreaPadding * 2;
    const printH = height - printAreaPadding * 2 - 60; // bottom offset

    const centerImage = useCallback(() => {
        if (userImg) {
            const scaleX = printW / userImg.width;
            const scaleY = printH / userImg.height;
            const s = Math.max(scaleX, scaleY);
            setImageProps({
                x: printX + printW / 2 - (userImg.width * s) / 2,
                y: printY + printH / 2 - (userImg.height * s) / 2,
                width: userImg.width * s,
                height: userImg.height * s,
            });
        }
    }, [userImg, printW, printH, printX, printY]);

    useEffect(() => {
        centerImage();
    }, [centerImage]);

    return (
        <Stage width={width} height={height} className="cursor-move">
            <Layer>
                {/* Case body / background */}
                <Group clipFunc={(ctx) => {
                    ctx.beginPath();
                    ctx.moveTo(caseRadius, 0);
                    ctx.lineTo(width - caseRadius, 0);
                    ctx.quadraticCurveTo(width, 0, width, caseRadius);
                    ctx.lineTo(width, height - caseRadius);
                    ctx.quadraticCurveTo(width, height, width - caseRadius, height);
                    ctx.lineTo(caseRadius, height);
                    ctx.quadraticCurveTo(0, height, 0, height - caseRadius);
                    ctx.lineTo(0, caseRadius);
                    ctx.quadraticCurveTo(0, 0, caseRadius, 0);
                    ctx.closePath();
                }}>
                    {/* Base color of the case */}
                    <KonvaImage
                        x={0}
                        y={0}
                        width={width}
                        height={height}
                        fill={caseColor}
                        image={undefined}
                    />

                    {/* User uploaded image (draggable) */}
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

            {/* Overlay: Camera cutout */}
            <Layer listening={false}>
                {/* Camera module area */}
                <Group>
                    {/* Camera background */}
                    <KonvaImage
                        x={width - 95}
                        y={12}
                        width={80}
                        height={80}
                        cornerRadius={18}
                        fill="rgba(0,0,0,0.85)"
                        image={undefined}
                    />
                </Group>
            </Layer>
        </Stage>
    );
}
