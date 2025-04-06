
import React, { Suspense, lazy } from "react"

import { SplitLayout, ConfigProvider, usePlatform, ScreenSpinner } from "@vkontakte/vkui"
import { Epic, Panel, View, useRouterPopout } from "@kokateam/router-vkminiapps"
import { useSnackbar } from "./hooks/useSnackbar"
import { useModal } from "./hooks/useModal"
import { useRecoilState } from "recoil"

const MainPage = lazy(() => import("./pages/main.jsx"))
const RatingPage = lazy(() => import("./pages/rating.jsx"))
const MemoryGame = lazy(() => import("./pages/memoryGame.jsx"))
const WordBotGame = lazy(() => import("./pages/wordBotGame.jsx"))

const App = () => {
    const [modal] = useRecoilState(useModal)
    const [snackbar] = useSnackbar()
    const platform = usePlatform()
    const [popout] = useRouterPopout(<ScreenSpinner size="large" />)

    return <ConfigProvider platform={platform} appearance="light">
        <SplitLayout popout={popout}>
            <Epic>
                <View id="mainviewws">
                    <Panel id="main">
                        <Suspense fallback={<ScreenSpinner />}>
                            <MainPage />
                        </Suspense>
                    </Panel>

                    <Panel id="rating">
                        <Suspense fallback={<ScreenSpinner />}>
                            <RatingPage />
                        </Suspense>
                    </Panel>

                    <Panel id="word-bot">
                        <Suspense fallback={<ScreenSpinner />}>
                            <WordBotGame />
                        </Suspense>
                    </Panel>
                    <Panel id="memory">
                        <Suspense fallback={<ScreenSpinner />}>
                            <MemoryGame />
                        </Suspense>
                    </Panel>
                </View>
            </Epic>
        </SplitLayout>
        {modal}
        {snackbar}
    </ConfigProvider>
}

export default App
