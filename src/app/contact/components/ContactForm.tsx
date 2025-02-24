"use client";

import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiSendPlaneFill } from "react-icons/ri";
import { sendEmail } from "@/utils/sendEmail";
import { useState } from "react";

export type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const validationSchema: ZodType<FormData> = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email("Invalid email address"),
  subject: z.string().min(1, { message: "Subject is required!" }),
  message: z.string().min(1, { message: "Message is required!" }),
});

export default function ContactForm() {
  const [waitForRes, setWaitForRes] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    setWaitForRes(true);

    try {
      await sendEmail(data);
      // Optionally, clear the form or show a success message
    } catch (error) {
      // Handle the error if needed, already shown by toast
      console.log(error);
    } finally {
      setWaitForRes(false);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid sm:grid-cols-2 gap-y-6 gap-x-4 *:flex *:flex-col">
        <label>
          <input
            className="bg-[#e9e9e9] dark:bg-[#252525] rounded-3xl py-3 px-4 text-black dark:text-white outline-none"
            {...register("name")}
            placeholder="Your Name"
          />
          {errors.name && (
            <span className="text-red-500 mt-1">{errors.name.message}</span>
          )}
        </label>

        <label>
          <input
            autoCapitalize="off"
            className="bg-[#e9e9e9] dark:bg-[#252525] rounded-3xl py-3 px-4 text-black dark:text-white outline-none"
            {...register("email")}
            placeholder="Your Email"
          />
          {errors.email && (
            <span className="text-red-500 mt-1">{errors.email.message}</span>
          )}
        </label>

        <label className="sm:col-span-2">
          <input
            className="bg-[#e9e9e9] dark:bg-[#252525] rounded-3xl py-3 px-4 text-black dark:text-white outline-none"
            {...register("subject")}
            placeholder="Your Subject"
          />
          {errors.subject && (
            <span className="text-red-500 mt-1">{errors.subject.message}</span>
          )}
        </label>

        <label className="sm:col-span-2">
          <textarea
            className="bg-[#e9e9e9] dark:bg-[#252525] rounded-3xl py-3 px-4 text-black dark:text-white min-h-44 outline-none"
            {...register("message")}
            placeholder="Your Message"
          ></textarea>
          {errors.message && (
            <span className="text-red-500 mt-1">{errors.message.message}</span>
          )}
        </label>
      </div>
      <button
        className={`border border-primary pl-5 rounded-full flex items-center justify-between gap-7 mt-8 relative overflow-hidden button-hover ${
          waitForRes && "wait-for-response bg-primary opacity-80 cursor-default"
        }`}
        type="submit"
      >
        Send Message
        <span className="rounded-full h-12 w-12 flex items-center justify-center bg-primary">
          <RiSendPlaneFill style={{ width: "22px", height: "22px" }} />
        </span>
      </button>
    </form>
  );
}
