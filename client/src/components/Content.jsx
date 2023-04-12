import { Form, Input, DatePicker, TimePicker, Button, message } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import '../content.css';

const { TextArea } = Input;

const Content = () => {

    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onFinish = (values) => {
        setIsSubmitting(true);
        message.success('Hooray! Taxi booked for: Date ' + dayjs(values.date).format('DD/MM/YYYY') +
            ', Time ' + dayjs(values.time).format('HH:mm') +
            ', Pickup Location: ' + values.pickup +
            ', Drop Location: ' + values.dropoff +
            ', Additional Requirements: ' + values.requirements);

        console.log('Inquiry Details: ', values);

        form.resetFields();
        setIsSubmitting(false);
    };

    const validateDate = (rule, value, callback) => {
        if (value && value < dayjs().startOf('day')) {
            callback('Invalid date');
        } else {
            callback();
        }
    };

    const validateTime = (rule, value, callback) => {
        if (value && value < dayjs().startOf('hour')) {
            callback('Invalid time');
        } else {
            callback();
        }
    };

    return (
        <>
            <div className='container page'>
                <div className="row">
                    <div className='col-sm taxi'>
                        <img src="./taxi.gif" alt="loading..." />
                    </div>
                    <div className='form col-sm form'>
                        <div className='text-info text-center fs-1'>Book a taxi</div>
                        <Form
                            form={form}
                            name="inquiry"
                            onFinish={onFinish}
                            layout="vertical"
                        >
                            <Form.Item
                                label="Pickup Location"
                                name="pickup"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter pickup location',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter pickup location" />
                            </Form.Item>

                            <Form.Item
                                label="Drop-off Location"
                                name="dropoff"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter drop-off location',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter drop-off location" />
                            </Form.Item>

                            <Form.Item
                                label="Date"
                                name="date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a date',
                                    },
                                    {
                                        validator: validateDate,
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                label="Time"
                                name="time"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a time',
                                    },
                                    {
                                        validator: validateTime,
                                    },
                                ]}
                            >
                                <TimePicker format="h:mm a" />
                            </Form.Item>

                            <Form.Item
                                label="Additional Requirements"
                                name="requirements"
                            >
                                <TextArea rows={4} placeholder="Enter additional requirements" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Content;