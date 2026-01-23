import {ref, computed} from "vue";

export function useTimer() {
    const timer = ref(0)
    let intervalId: number | null = null

    const startTimer = () => {
        if (intervalId === null) {
            intervalId = window.setInterval(() => {
                timer.value += 1
            }, 1000)
        }
    }

    const stopTimer = () => {
        if (intervalId !== null) {
            clearInterval(intervalId)
            intervalId = null
        }
    }

    const resetTimer = () => {
        timer.value = 0
    }

    // Add a computed property to format the timer as minutes and seconds
    const formattedTimer = computed(() => {
        const minutes = Math.floor(timer.value / 60);
        const seconds = timer.value % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });

    return {
        timer,
        formattedTimer,
        startTimer,
        stopTimer,
        resetTimer,
    }
}