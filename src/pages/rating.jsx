import React from "react"
import { useRouterPanel } from "@kokateam/router-vkminiapps"
// import { PanelHeader } from "@vkontakte/vkui"

const RatingPage = () => {
    const [panel, toPanel] = useRouterPanel()

    return <div>
        {/* <PanelHeader style={{ textAlign: "center" }} separator={true}>Рейтинг</PanelHeader> */}

        {/* <div>
            <h1>Это OtherPage</h1>
            <button onClick={() => toPanel("main")}>Вернуться на MainPage</button>
        </div> */}
    </div>
}

export default RatingPage