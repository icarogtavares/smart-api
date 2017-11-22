import mqtt from 'mqtt'
import { has, __ } from 'ramda'
import * as noisesService from '../services/noises'
import * as errorsService from '../services/errors'
const client = mqtt.connect('mqtt://' + process.env.MQTT || 'test.mosquitto.org')
const TOPIC_NOISE = process.env.T || 'SMART/NOISE'

export const start_connection = () => {
    client.on('connect', () => {
        client.subscribe(TOPIC_NOISE)
    })

    client.on('message', (topic, message) => {
        switch (topic) {
        case TOPIC_NOISE:
            return handleTopicNoise(message)
        }
        console.log('No handler for topic %s', topic)
    })

    function handleTopicNoise (message) {
        const messageJson = JSON.parse(message.toString());
        const messageHas = has(__, messageJson);
        if(messageHas('sound_level')) {
            noisesService.create(messageJson).catch(err => console.log(err));
        } else if(messageHas('error')) {
            messageJson.code = messageJson.error;
            delete messageJson.error;
            errorsService.increment(messageJson).catch(err => console.log(err));
        }
    
    }
}
