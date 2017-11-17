import mqtt from 'mqtt'
import { has } from 'ramda'
import * as noisesService from '../services/noises'
import * as errorsService from '../services/errors'
const client = mqtt.connect('mqtt://test.mosquitto.org')
const TOPIC_NOISE = 'smart/noise'

export const start_connection = () => {
    client.on('connect', () => {
        client.subscribe(TOPIC_NOISE)
        client.publish(TOPIC_NOISE, "{\"sound_level\": 16}")
        client.publish(TOPIC_NOISE, "{\"error\": -2}")
    })

    client.on('message', (topic, message) => {
        switch (topic) {
        case TOPIC_NOISE:
            return handleTopicNoise(message)
        }
        console.log('No handler for topic %s', topic)
    })

    function handleTopicNoise (message) {
        const noise = JSON.parse(message.toString())
        const hasSoundLevel = has('sound_level');
        const hasError = has('error');
        if(hasSoundLevel(noise)) {
            noisesService.create(noise).catch(err => console.log(err));
        } else if(hasError(noise)) {

        }
    
    }
}