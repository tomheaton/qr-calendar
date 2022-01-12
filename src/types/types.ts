type EventData = {
    dateTime: string,
    hours: string,
    minutes: string,
    service: string,
    operator: string,
    location?: string
}

type OptionsData = {
    operator: string,
    location: string
}

export type {EventData, OptionsData};