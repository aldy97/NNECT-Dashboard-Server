import crypto from 'crypto';

export default (pwd: crypto.BinaryLike): string => {
    const md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex');
};
