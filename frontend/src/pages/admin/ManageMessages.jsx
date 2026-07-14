import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2, FiMail } from "react-icons/fi";
import { MdMarkEmailRead } from "react-icons/md";
import * as contactApi from "../../api/contactApi.js";

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => contactApi.getContactMessages().then((res) => setMessages(res.data.messages)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const toggleRead = async (m) => {
    try {
      await contactApi.updateContactMessage(m._id, { read: !m.read });
      load();
    } catch {
      toast.error("Failed to update message");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await contactApi.deleteContactMessage(id);
      toast.success("Message deleted");
      load();
    } catch {
      toast.error("Failed to delete message");
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Contact Messages</h1>
      <p className="mt-1 text-sm text-stone-500">Messages submitted through the contact form.</p>

      <div className="mt-8 space-y-3">
        {loading ? (
          <p className="text-center text-stone-400">Loading…</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-stone-400">No messages yet.</p>
        ) : (
          messages.map((m) => (
            <div key={m._id} className={`rounded-2xl p-5 shadow-sm ring-1 ${m.read ? "bg-white ring-stone-100 dark:bg-stone-900 dark:ring-stone-800" : "bg-primary/5 ring-primary/20"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{m.name} <span className="font-normal text-stone-500">· {m.email}</span></p>
                  {m.subject && <p className="mt-0.5 text-sm font-medium text-stone-600 dark:text-stone-300">{m.subject}</p>}
                  <p className="mt-2 text-sm text-stone-500">{m.message}</p>
                  <p className="mt-2 text-xs text-stone-400">{new Date(m.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => toggleRead(m)} className="grid h-8 w-8 place-items-center rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700" aria-label="Toggle read">
                    {m.read ? <FiMailOpen size={14} /> : <FiMail size={14} />}
                  </button>
                  <button onClick={() => handleDelete(m._id)} className="grid h-8 w-8 place-items-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageMessages;
