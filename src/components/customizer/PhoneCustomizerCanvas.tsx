"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage, Group, Text as KonvaText, Transformer } from 'react-konva';
import useImage from 'use-image';

export type CustomElement = {
    id: string;
    type: 'image' | 'text';
    url?: string;
    text?: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    rotation: number;
    fill?: string;
    fontSize?: number;
    fontFamily?: string;
};

interface PhoneCustomizerCanvasProps {
    width?: number;
    height?: number;
    elements: CustomElement[];
    setElements: React.Dispatch<React.SetStateAction<CustomElement[]>>;
    caseColor?: string;
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
}

// Sub-component for Images
const URLImage = ({ element, isSelected, onSelect, onChange }: any) => {
    const [image] = useImage(element.url, 'anonymous');
    const shapeRef = useRef<any>(null);
    const trRef = useRef<any>(null);

    useEffect(() => {
        if (isSelected && trRef.current && shapeRef.current) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected, image]);

    return (
        <React.Fragment>
            <KonvaImage
                image={image}
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...element}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...element,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    // Reset scaling to avoid compound scaling issues
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...element,
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(5, node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 10 || newBox.height < 10) return oldBox;
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};

// Sub-component for Text
const CustomText = ({ element, isSelected, onSelect, onChange }: any) => {
    const shapeRef = useRef<any>(null);
    const trRef = useRef<any>(null);

    useEffect(() => {
        if (isSelected && trRef.current && shapeRef.current) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected, element.text, element.fontSize, element.fontFamily, element.fill]);

    return (
        <React.Fragment>
            <KonvaText
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...element}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...element,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    node.scaleX(1);
                    node.scaleY(1);

                    onChange({
                        ...element,
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(5, node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 10 || newBox.height < 10) return oldBox;
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default function PhoneCustomizerCanvas({
    width = 260,
    height = 520,
    elements,
    setElements,
    caseColor = "#1a1a1a",
    selectedId,
    setSelectedId
}: PhoneCustomizerCanvasProps) {

    const caseRadius = 40;

    // Deselect when clicking on empty area or background
    const checkDeselect = (e: any) => {
        const clickedOnEmpty = e.target === e.target.getStage() || e.target.attrs.id === 'case-bg';
        if (clickedOnEmpty) {
            setSelectedId(null);
        }
    };

    return (
        <Stage
            width={width}
            height={height}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
        >
            <Layer>
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
                    {/* Base Case Background */}
                    <KonvaImage
                        id="case-bg"
                        x={0}
                        y={0}
                        width={width}
                        height={height}
                        fill={caseColor}
                        image={undefined}
                    />

                    {/* User Elements */}
                    {elements.map((el, i) => {
                        if (el.type === 'image') {
                            return (
                                <URLImage
                                    key={el.id}
                                    element={el}
                                    isSelected={el.id === selectedId}
                                    onSelect={() => setSelectedId(el.id)}
                                    onChange={(newAttrs: CustomElement) => {
                                        const elms = [...elements];
                                        elms[i] = newAttrs;
                                        setElements(elms);
                                    }}
                                />
                            );
                        }
                        if (el.type === 'text') {
                            return (
                                <CustomText
                                    key={el.id}
                                    element={el}
                                    isSelected={el.id === selectedId}
                                    onSelect={() => setSelectedId(el.id)}
                                    onChange={(newAttrs: CustomElement) => {
                                        const elms = [...elements];
                                        elms[i] = newAttrs;
                                        setElements(elms);
                                    }}
                                />
                            );
                        }
                        return null;
                    })}
                </Group>
            </Layer>

            {/* Camera Module Cutout (Doesn't process clicks so elements underneath can't be interacted with, but visual only) */}
            <Layer listening={false}>
                <Group>
                    <KonvaImage
                        x={width - 95}
                        y={12}
                        width={80}
                        height={80}
                        cornerRadius={20}
                        fill="#050505"
                        image={undefined}
                        stroke="#ffffff"
                        strokeWidth={1}
                        opacity={0.9}
                    />
                </Group>
            </Layer>
        </Stage>
    );
}
