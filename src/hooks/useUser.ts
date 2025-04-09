import axios from "axios"

import { useEffect, useState } from "react"


interface IUseUser {
    dependencies: Array<any>
}

export const useUser = ({ dependencies }: IUseUser) => {
    const [experience, setExperience] = useState(0)
    const [money, setMoney] = useState(0)
    const [hints, setHints] = useState(0)

    useEffect(() => {
        const fetcher = async () => {
            try {
                const response = await axios.get("/user")
                const data = await response.data
                
                setHints(data.hints)
                setExperience(data.exp)
                setMoney(data.money)
            }
            catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetcher()
    }, dependencies)

    return { experience, money, hints, setHints }
}