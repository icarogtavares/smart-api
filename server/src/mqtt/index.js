import mqtt from 'mqtt'
import * as noisesService from '../services/noises'

const client = mqtt.connect('mqtt://test.mosquitto.org')
const TOPIC_NOISE = 'smart/noise'

export const start_connection = () => {
    client.on('connect', () => {
        client.subscribe(TOPIC_NOISE)
        client.publish(TOPIC_NOISE, "{\"sound_level\": 16}")
    })

    client.on('message', (topic, message) => {
        switch (topic) {
        case TOPIC_NOISE:
            return handleTopicNoise(message)
        //   case 'xxxx/yyyy':
        //     return handleXXXXYYYYState(message)
        }
        console.log('No handler for topic %s', topic)
    })

    function handleTopicNoise (message) {
        const noise = JSON.parse(message.toString())
        noisesService.create(noise);
        console.log(noise)
    }
}