import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest): Promise<NextResponse> { // Add return type
    const { email, name, subject, message }: { email: string, name: string, subject: string, message: string } = await request.json();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL as string, // Ensure type is string
            pass: process.env.MY_PASSWORD as string, // Ensure type is string
        },
    });

    const mailOptions: Mail.Options = {
        from: process.env.MY_EMAIL,
        to: process.env.MY_EMAIL,
        // cc: email, (uncomment this line if you want to send a copy to the sender)
        subject: `Message from ${name} (${email}) about ${subject}`,
        text: message,
    };

    const sendMailPromise = (): Promise<string> =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Message sent');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        await sendMailPromise();
        return NextResponse.json({ message: 'Message sent' });
    } catch (err) {
        // @ts-expect-error fgfdsg
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
