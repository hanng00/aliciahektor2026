"use client";

import { useState } from "react";

type Guest = { name: string; allergy: string };
type Status = "idle" | "sending" | "success" | "error";

const WEB3FORMS_KEY = "86e4e5bc-7c93-4346-9e89-d077a1b42628";

const emptyGuest = (): Guest => ({ name: "", allergy: "" });

const buildMessage = (guests: Guest[]) =>
  guests
    .map(
      (g, i) =>
        `Person ${i + 1}:\nNamn: ${g.name}\nAllergi: ${g.allergy || "Inga"}`,
    )
    .join("\n\n");

export default function RsvpForm() {
  const [guests, setGuests] = useState<Guest[]>([emptyGuest()]);
  const [status, setStatus] = useState<Status>("idle");

  const update = (i: number, field: keyof Guest, value: string) => {
    setGuests((prev) =>
      prev.map((g, idx) => (idx === i ? { ...g, [field]: value } : g)),
    );
  };

  const addPerson = () => setGuests((prev) => [...prev, emptyGuest()]);

  const removePerson = (i: number) =>
    setGuests((prev) => prev.filter((_, idx) => idx !== i));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: "OSA bröllop",
        from_name: "Alicia & Hektor – OSA",
        message: buildMessage(guests),
      }),
    });

    if (res.ok) {
      setStatus("success");
      setGuests([emptyGuest()]);
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-wedding-red mb-2">Tack!</h2>
        <p className="text-wedding-red-dark">
          Din anmälan är skickad. Vi ses 2026!
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-wedding-red underline"
        >
          Anmäl fler personer
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 text-left space-y-4"
    >
      <h2 className="text-2xl font-bold text-wedding-red text-center mb-2">
        OSA
      </h2>

      {guests.map((g, i) => (
        <div
          key={i}
          className="border border-wedding-pink rounded-xl p-4 space-y-3 bg-wedding-light-pink/40"
        >
          <div className="flex items-center justify-between">
            <span className="text-wedding-red font-semibold">
              Person {i + 1}
            </span>
            {guests.length > 1 && (
              <button
                type="button"
                onClick={() => removePerson(i)}
                className="text-sm text-wedding-red-dark hover:underline"
              >
                Ta bort
              </button>
            )}
          </div>

          <input
            required
            type="text"
            placeholder="Namn"
            value={g.name}
            onChange={(e) => update(i, "name", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-wedding-pink focus:outline-none focus:ring-2 focus:ring-wedding-red bg-white"
          />

          <input
            type="text"
            placeholder="Allergi (lämna tomt om inga)"
            value={g.allergy}
            onChange={(e) => update(i, "allergy", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-wedding-pink focus:outline-none focus:ring-2 focus:ring-wedding-red bg-white"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addPerson}
        className="w-full px-4 py-3 rounded-full border-2 border-dashed border-wedding-red text-wedding-red font-semibold hover:bg-wedding-red hover:text-white transition-colors"
      >
        + Lägg till person
      </button>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full px-4 py-3 rounded-full bg-wedding-red text-white font-semibold tracking-wide shadow-lg hover:bg-wedding-red-dark transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Skickar…" : "Skicka anmälan"}
      </button>

      {status === "error" && (
        <p className="text-sm text-wedding-red-dark text-center">
          Något gick fel. Försök igen.
        </p>
      )}
    </form>
  );
}
