export default function validateUserName(userName) {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(userName))
        return false
    else
        return true
}