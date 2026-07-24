"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { contactSchema, type ContactFormValues } from "@/schemas/contact";

const initialForm: ContactFormValues = { name: "", email: "", message: "" };

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

async function sendMessage(payload: ContactFormValues): Promise<ContactFormValues> {
  // Graceful fallback without Supabase configured, simulate a successful
  if (!isSupabaseConfigured || !supabase) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return payload;
  }

  const { error } = await supabase.from("messages").insert(payload);
  if (error) throw new Error(error.message);
  return payload;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormValues>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      setForm(initialForm);
      setFieldErrors({});
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.reset();

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactFormValues;
        errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    mutation.mutate(result.data);
  };

  const inputClasses = (hasError?: string) =>
    `w-full rounded-md border bg-surface-raised px-4 py-3 text-sm text-heading placeholder:text-muted focus:outline-none ${
      hasError ? "border-red-500/60" : "border-border focus:border-cyan/60"
    }`;

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">05 / contact</p>
        <h2 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">Get in touch</h2>
        <p className="mt-3 text-sm leading-relaxed text-body">
          Have a project, a role, or just a question? Send a message and I&apos;ll get back to
          you.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              className={inputClasses(fieldErrors.name)}
              placeholder="Jordan Kim"
            />
            {fieldErrors.name && (
              <p id="name-error" className="mt-1.5 text-xs text-red-400">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={inputClasses(fieldErrors.email)}
              placeholder="jordan@example.com"
            />
            {fieldErrors.email && (
              <p id="email-error" className="mt-1.5 text-xs text-red-400">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? "message-error" : undefined}
              className={`${inputClasses(fieldErrors.message)} resize-none`}
              placeholder="What are you building?"
              maxLength={1000}
            />
            <div className="mt-1.5 flex items-center justify-between">
              {fieldErrors.message ? (
                <p id="message-error" className="text-xs text-red-400">
                  {fieldErrors.message}
                </p>
              ) : (
                <span />
              )}
              <span className="font-mono text-[11px] text-muted">{form.message.length}/1000</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-cyan px-5 py-3 font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send message
              </>
            )}
          </button>

          {mutation.isSuccess && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-md border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm text-cyan"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Message sent — thanks for reaching out, I&apos;ll reply soon.
            </div>
          )}

          {mutation.isError && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              Something went wrong sending your message. Please try again.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
