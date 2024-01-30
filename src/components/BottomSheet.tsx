import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';


const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 0;


type BottomSheetProps = {
    children?: React.ReactNode
};
export type BottomSheetRefProps = {
    scrollto: (destiantion: number) => void
    isActive: () => boolean;
};



const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(({ children }, ref) => {
    const active = useSharedValue(false)

    const scrollto = useCallback(
        (destination: number) => {
            'worklet';
            if (destination === 0) {
                active.value = false
            } else {
                active.value = true
            }
            active.value = destination !== 0
            translationY.value = withSpring(destination, { damping: 50 })
        },
        [],
    )

    const isActive = useCallback(
        () => {
            return active.value
        },
        [],
    )

    useImperativeHandle(ref, () => ({ scrollto, isActive }), [scrollto, isActive])

    const translationY = useSharedValue(0)

    const context = useSharedValue({ y: 0 });

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translationY.value }
        })
        .onUpdate((event) => {
            translationY.value = event.translationY + context.value.y;
            translationY.value = Math.max(translationY.value, MAX_TRANSLATE_Y)
        }).onEnd(() => {
            if (translationY.value > SCREEN_HEIGHT / 3) {
                scrollto(0);
            }
            // else if(translationY.value < SCREEN_HEIGHT / 1.5) {
            //     scrollto(MAX_TRANSLATE_Y)
            // }
        })

    useEffect(() => {
        scrollto(-SCREEN_HEIGHT / 3)

    }, [])

    const rBottomSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(translationY.value,
            [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
            [25, 5],
            Extrapolate.CLAMP
        )
        return {
            borderRadius,
            transform: [{ translateY: translationY.value }],
        }
    });



    return (
        <GestureDetector gesture={gesture}>

            <Animated.View style={[styles.BottomSheet, rBottomSheetStyle]} >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent:"space-between"
                }}>
                    <View style={{
                        width: '30%',
                       
                    }}>
                        <Text style={{
                            fontSize: 10,
                            color: '#fff',
                            textAlign: 'left',
                            paddingLeft: 9,
                            
                        }}>
                            Forecast weather
                        </Text>

                    </View>

                    <View style={{
                        width:'60%',
                            flexDirection:'row',
                            justifyContent:'flex-start'
                    }}>
                        <View style={styles.Line} />


                    </View>


                </View>

                {children}
            </Animated.View>
        </GestureDetector>
    )
})

export default BottomSheet

const styles = StyleSheet.create({
    BottomSheet: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 25,
    },
    Line: {
        width: 75,
        height: 4,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
        zIndex: 1,
    }
})