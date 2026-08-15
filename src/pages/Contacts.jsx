import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockEmergencyContacts } from '../data/mockData';
import { Phone, UserPlus, Edit, Trash2, Star, User } from 'lucide-react';

export default function Contacts() {
  const [contacts, setContacts] = useState([
    ...mockEmergencyContacts,
    { id: 'ec_3', name: 'Dr. Suresh', relation: 'Family Doctor', phone: '+91 90000 11111', isPrimary: false },
    { id: 'ec_4', name: 'Office Security', relation: 'Work', phone: '+91 80000 22222', isPrimary: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Emergency Contacts</h1>
          <p className="text-slate-500 mt-1">Manage who gets notified during an emergency.</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <UserPlus className="h-4 w-4" /> Add Contact
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {contacts.map(contact => (
          <Card key={contact.id} className={contact.isPrimary ? "border-blue-400 bg-blue-50/30" : ""}>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${contact.isPrimary ? 'bg-blue-100 text-blue-900' : 'bg-slate-100 text-slate-500'}`}>
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 flex items-center gap-1">
                      {contact.name}
                      {contact.isPrimary && <Star className="h-3.5 w-3.5 text-orange-500 fill-orange-500 ml-1" />}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{contact.relation}</p>
                  </div>
                </div>
                {contact.isPrimary && <Badge variant="primary" className="text-[10px]">Primary</Badge>}
              </div>
              
              <div className="bg-slate-50 border border-slate-100 rounded-md p-3 flex justify-between items-center mb-4">
                <span className="font-medium text-slate-700 font-mono text-sm">{contact.phone}</span>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-slate-200">
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Add New Contact</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <Input placeholder="e.g. Ramesh" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Relationship</label>
                  <select className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900">
                    <option>Family</option>
                    <option>Friend</option>
                    <option>Work</option>
                    <option>Doctor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <Input type="tel" placeholder="+91" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="primary" className="h-4 w-4 text-blue-900 rounded border-slate-300" />
                  <label htmlFor="primary" className="text-sm text-slate-700">Set as primary emergency contact</label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button variant="primary" className="flex-1" onClick={() => setIsModalOpen(false)}>Save Contact</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
