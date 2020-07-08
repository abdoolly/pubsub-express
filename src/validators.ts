/**
 * @description function to validate url 
 * @param url url to check if is valid
 */
export const isValidUrl = (url: string) => {
    if (!url)
        return false;

    // regex to make sure it's a valid url
    if (!/^(http|https):\/\/[^ "]+$/.test(url))
        return false;

    return true;
};

/**
 * @description function to validate topic is valid 
 * making sure topic has no special charaters except - , _ , :
 * @param topic topic to validate
 */
export const isValidTopic = (topic: string) => {

    if (/[!@#$%^&*()+=\[\]{};'"\\|,.<>\/?]+/g.test(topic))
        return false;

    return true;
};