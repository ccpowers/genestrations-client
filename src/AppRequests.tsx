export type RegisterRequestBody = {
    name: string;
    prompt: string;
};

export type RegisterResponse = {
    status: 'ok';
    data: any; // Replace 'any' with the expected structure if known
};
