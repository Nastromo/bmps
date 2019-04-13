const mailjet = require('node-mailjet').connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

const sendThanksFeedback = (receiver, name) => {
    return mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "ismael@bemyplan.com",
                        "Name": "Bemypass Support Team"
                    },
                    "To": [
                        {
                            "Email": receiver
                        }
                    ],
                    "TemplateID": 748078,
                    "TemplateLanguage": true,
                    "Subject": "We received your feedback!",
                    "Variables": {
                        "firstname": name
                    }
                }
            ]
        });
};

const sendThanksQuestion = (receiver, name) => {
    return mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "ismael@bemyplan.com",
                        "Name": "Bemypass Support Team"
                    },
                    "To": [
                        {
                            "Email": receiver
                        }
                    ],
                    "TemplateID": 747902,
                    "TemplateLanguage": true,
                    "Subject": "We received your question!",
                    "Variables": {
                        "firstname": name
                    }
                }
            ]
        });
};

module.exports = {
    sendThanksFeedback,
    sendThanksQuestion
}
