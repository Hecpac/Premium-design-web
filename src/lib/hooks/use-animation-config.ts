'use client';

import { useEffect, useState, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { Variants, Transition, TargetAndTransition } from 'framer-motion';

// ============================================================================
// TYPES
// ============================================================================

export interface AnimationConfig {
    initial: TargetAndTransition;
    whileInView: TargetAndTransition;
    viewport: { once: boolean; margin?: string };
    transition: Transition;
}

export interface StaggerConfig {
    container: Variants;
    item: Variants;
}

// ============================================================================
// CONSTANTS - Premium easing curves
// ============================================================================

/** Premium easeOutExpo curve for cinematic deceleration */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/** Snappy spring for micro-interactions */
export const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 25 } as const;

/** Smooth spring for larger movements */
export const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25, mass: 0.5 } as const;

// ============================================================================
// HOOK: useShouldAnimate
// ============================================================================

/**
 * Returns whether animations should be enabled.
 * Uses Framer Motion's useReducedMotion hook with SSR safety.
 * 
 * @returns boolean - true if animations should play, false if user prefers reduced motion
 */
export function useShouldAnimate(): boolean {
    const prefersReducedMotion = useReducedMotion();
    return !prefersReducedMotion;
}

// ============================================================================
// HOOK: useAnimationConfig
// ============================================================================

/**
 * Returns a complete animation config object that respects prefers-reduced-motion.
 * 
 * @example
 * ```tsx
 * const animation = useAnimationConfig();
 * return <motion.div {...animation}>Content</motion.div>
 * ```
 * 
 * @param options - Optional overrides for default animation values
 * @returns AnimationConfig object compatible with Framer Motion props
 */
export function useAnimationConfig(options?: {
    y?: number;
    duration?: number;
    delay?: number;
    margin?: string;
}): AnimationConfig {
    const shouldAnimate = useShouldAnimate();
    const { y = 20, duration = 0.6, delay = 0, margin = '-100px' } = options || {};

    return useMemo(() => {
        if (!shouldAnimate) {
            return {
                initial: {},
                whileInView: {},
                viewport: { once: true },
                transition: { duration: 0 }
            };
        }

        return {
            initial: { opacity: 0, y },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin },
            transition: {
                duration,
                delay,
                ease: EASE_OUT_EXPO
            }
        };
    }, [shouldAnimate, y, duration, delay, margin]);
}

// ============================================================================
// HOOK: useStaggerAnimation
// ============================================================================

/**
 * Returns container and item variants for staggered animations.
 * Automatically disables when user prefers reduced motion.
 * 
 * @example
 * ```tsx
 * const { container, item } = useStaggerAnimation();
 * return (
 *   <motion.ul variants={container} initial="hidden" animate="show">
 *     {items.map(i => <motion.li key={i} variants={item}>{i}</motion.li>)}
 *   </motion.ul>
 * );
 * ```
 */
export function useStaggerAnimation(options?: {
    staggerDelay?: number;
    itemY?: number;
    itemDuration?: number;
}): StaggerConfig {
    const shouldAnimate = useShouldAnimate();
    const { staggerDelay = 0.1, itemY = 20, itemDuration = 0.5 } = options || {};

    return useMemo(() => {
        if (!shouldAnimate) {
            return {
                container: {
                    hidden: {},
                    show: {}
                },
                item: {
                    hidden: {},
                    show: {}
                }
            };
        }

        return {
            container: {
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.1
                    }
                }
            },
            item: {
                hidden: { opacity: 0, y: itemY },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: itemDuration,
                        ease: EASE_OUT_EXPO
                    }
                }
            }
        };
    }, [shouldAnimate, staggerDelay, itemY, itemDuration]);
}

// ============================================================================
// HOOK: useFadeAnimation
// ============================================================================

/**
 * Simple fade animation that respects reduced motion.
 * Only animates opacity (most performant).
 */
export function useFadeAnimation(options?: {
    duration?: number;
    delay?: number;
}): AnimationConfig {
    const shouldAnimate = useShouldAnimate();
    const { duration = 0.5, delay = 0 } = options || {};

    return useMemo(() => {
        if (!shouldAnimate) {
            return {
                initial: {},
                whileInView: {},
                viewport: { once: true },
                transition: { duration: 0 }
            };
        }

        return {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true, margin: '-50px' },
            transition: { duration, delay, ease: 'easeOut' }
        };
    }, [shouldAnimate, duration, delay]);
}

// ============================================================================
// HOOK: useHoverAnimation
// ============================================================================

/**
 * Returns hover/tap animations that respect reduced motion.
 * Uses transform-only properties for 60fps performance.
 * 
 * @example
 * ```tsx
 * const hover = useHoverAnimation();
 * return <motion.button whileHover={hover.hover} whileTap={hover.tap}>Click</motion.button>
 * ```
 */
export function useHoverAnimation(options?: {
    hoverY?: number;
    tapScale?: number;
}): {
    hover: TargetAndTransition;
    tap: TargetAndTransition;
    transition: Transition;
} {
    const shouldAnimate = useShouldAnimate();
    const { hoverY = -2, tapScale = 0.98 } = options || {};

    return useMemo(() => {
        if (!shouldAnimate) {
            return {
                hover: {},
                tap: {},
                transition: { duration: 0 }
            };
        }

        return {
            hover: { y: hoverY },
            tap: { scale: tapScale },
            transition: SPRING_SNAPPY
        };
    }, [shouldAnimate, hoverY, tapScale]);
}

// ============================================================================
// HOOK: useScrollAnimation (for parallax effects)
// ============================================================================

/**
 * Returns safe parallax values - respects reduced motion.
 * 
 * @param baseValue - The parallax offset when motion is enabled
 * @returns 0 if reduced motion, otherwise returns baseValue
 */
export function useParallaxValue(baseValue: number): number {
    const shouldAnimate = useShouldAnimate();
    return shouldAnimate ? baseValue : 0;
}

// ============================================================================
// PREBUILT VARIANTS (static, for when hooks aren't needed)
// ============================================================================

/**
 * Fade-up animation variants.
 * Use with useReducedMotion() check in component.
 */
export const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE_OUT_EXPO }
    }
};

/**
 * Fade-in only variants (most performant).
 */
export const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

/**
 * Scale-up variants for modals/cards.
 */
export const scaleUpVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3, ease: EASE_OUT_EXPO }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.2 }
    }
};

/**
 * No-op variants for reduced motion.
 */
export const noMotionVariants: Variants = {
    hidden: {},
    visible: {},
    exit: {}
};
