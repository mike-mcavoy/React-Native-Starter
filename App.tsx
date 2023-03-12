import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

const Book = () => {
    return <View className="h-[420] w-[275] rounded-md bg-stone-500"></View>;
};

const Header = ({
    translateY,
}: {
    translateY: Animated.SharedValue<number>;
}) => {
    const animOpacity = useAnimatedStyle(() => {
        const opacity = interpolate(translateY.value, [100, 300], [1, 0]);

        return {
            opacity,
        };
    });

    const animatedBook = useAnimatedStyle(() => {
        const translation = interpolate(
            translateY.value,
            [0, 50, 250],
            [0, 0, -100]
        );
        const opacity = interpolate(translateY.value, [200, 250], [1, 0]);

        return {
            transform: [
                {
                    translateY: translation,
                },
            ],
            opacity,
        };
    });

    const animatedContent = useAnimatedStyle(() => {
        const translation = interpolate(
            translateY.value,
            [0, 50, 250, 325],
            [0, 0, -100, -150]
        );

        const opacity = interpolate(translateY.value, [300, 350], [1, 0]);

        return {
            transform: [{ translateY: translation }],
            opacity,
        };
    });

    const animatedGradient = useAnimatedStyle(() => {
        const translation = interpolate(
            translateY.value,
            [0, 150, 150],
            [400, 301, 301]
        );

        const opacity = interpolate(translateY.value, [0, 100], [0, 1]);

        return {
            top: translation,
            opacity,
        };
    });

    return (
        <View className="items-center bg-black">
            <Animated.View className="z-10 mt-16" style={animatedBook}>
                <Book />
            </Animated.View>
            <Animated.View
                className="absolute z-0 h-[400] w-full bg-slate-300"
                style={animOpacity}
            ></Animated.View>
            <Animated.View
                style={animatedGradient}
                className="absolute top-[400] h-[100] w-full"
            >
                <LinearGradient
                    className="h-[100]"
                    colors={['transparent', 'rgba(0,0,0,1)']}
                />
            </Animated.View>
            <Animated.View style={animatedContent}>
                <Text className="mt-5 text-white">The Hobbit</Text>
                <Text className="text-white">J.R.R. Tolkien</Text>
                <Text className="text-white">Add to Wishlist</Text>
                <Text className="text-white">Add to Shelf</Text>
            </Animated.View>
        </View>
    );
};

const Content = () => {
    return <View className="h-[1000] bg-black"></View>;
};

export default function App() {
    const translateY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateY.value = event.contentOffset.y;
    });

    return (
        <View>
            <Animated.ScrollView
                className="h-full"
                bounces={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Header translateY={translateY} />
                <Content />
            </Animated.ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}
