import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Code, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormProps {
  selectedPersona?: "dev" | "ceo" | null;
}

export function ContactForm({ selectedPersona }: ContactFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState<"development" | "strategy">(
    selectedPersona === "ceo" ? "strategy" : "development"
  );
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      serviceType: "development",
      projectDetails: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "I'll get back to you soon.",
      });
      form.reset();
      setShowForm(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const handleServiceSelect = (service: "development" | "strategy") => {
    setSelectedService(service);
    setShowForm(true);
    form.setValue("serviceType", service);
  };

  const isDevPersona = selectedPersona === "dev";
  const isCeoPersona = selectedPersona === "ceo";

  return (
    <section id="contact" className={`min-h-screen py-20 transition-all duration-700 ${
      isDevPersona 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" 
        : isCeoPersona 
        ? "bg-gradient-to-br from-amber-50 via-white to-gray-100" 
        : "bg-gradient-to-br from-gray-900 to-gray-800"
    }`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-6 transition-all duration-500 ${
            isDevPersona 
              ? "font-mono text-matrix" 
              : isCeoPersona 
              ? "font-serif text-ceo-gold" 
              : "font-serif text-white"
          }`}>
            {isDevPersona ? "Let's Build Something" : isCeoPersona ? "Let's Strategize Together" : "Let's Work Together"}
          </h2>
          <p className={`text-xl transition-colors duration-500 ${
            isDevPersona 
              ? "text-gray-300" 
              : isCeoPersona 
              ? "text-gray-600" 
              : "text-gray-300"
          }`}>
            {isDevPersona ? "Ready to code your vision into reality" : isCeoPersona ? "Transform your business vision into success" : "Choose how you'd like to collaborate"}
          </p>
        </div>

        {!showForm && (
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Hire as Developer */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gray-800 border-matrix/30 hover:border-matrix transition-all duration-300 cursor-pointer"
                    onClick={() => handleServiceSelect("development")}>
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-matrix rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-mono font-bold text-matrix mb-2">
                    Hire as Developer
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Need technical solutions, web apps, or system architecture?
                  </p>
                  <Button className="w-full py-3 bg-matrix text-black font-mono font-semibold hover:bg-matrix/80 transition-colors">
                    Start Development Project
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Hire as CEO/Strategist */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-ceo-ivory border-ceo-gold/30 hover:border-ceo-gold transition-all duration-300 cursor-pointer"
                    onClick={() => handleServiceSelect("strategy")}>
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-ceo-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-ceo-charcoal mb-2">
                    Hire as Strategist
                  </h3>
                  <p className="text-ceo-charcoal/70 mb-6">
                    Need business strategy, brand development, or leadership?
                  </p>
                  <Button className="w-full py-3 bg-ceo-gold text-white font-serif font-semibold hover:bg-ceo-gold/80 transition-colors">
                    Start Strategy Consultation
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Contact Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedService === "development" ? "Development" : "Strategy"} Project
                  </h3>
                  <Button
                    variant="ghost"
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ← Back
                  </Button>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Name</Label>
                      <Input
                        id="name"
                        {...form.register("name")}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                        placeholder="Your name"
                      />
                      {form.formState.errors.name && (
                        <p className="text-red-400 text-sm mt-1">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                        placeholder="your@email.com"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="serviceType" className="text-gray-300">Service Type</Label>
                    <Select
                      value={form.watch("serviceType")}
                      onValueChange={(value) => form.setValue("serviceType", value)}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development Services</SelectItem>
                        <SelectItem value="strategy">Business Strategy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="projectDetails" className="text-gray-300">Project Details</Label>
                    <Textarea
                      id="projectDetails"
                      {...form.register("projectDetails")}
                      rows={5}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 resize-none"
                      placeholder="Tell me about your project..."
                    />
                    {form.formState.errors.projectDetails && (
                      <p className="text-red-400 text-sm mt-1">
                        {form.formState.errors.projectDetails.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full py-3 bg-gradient-to-r from-matrix to-ceo-gold text-black font-semibold hover:from-matrix/80 hover:to-ceo-gold/80 transition-all duration-300"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
