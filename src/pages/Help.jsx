import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  HelpCircle,
  BookOpen,
  Users,
  Settings,
  Shield,
  CreditCard,
  Smartphone
} from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", icon: <HelpCircle size={20} /> },
    { id: "getting-started", name: "Getting Started", icon: <BookOpen size={20} /> },
    { id: "finding-partners", name: "Finding Partners", icon: <Users size={20} /> },
    { id: "account", name: "Account & Settings", icon: <Settings size={20} /> },
    { id: "safety", name: "Safety & Privacy", icon: <Shield size={20} /> },
    { id: "billing", name: "Billing & Payments", icon: <CreditCard size={20} /> },
    { id: "mobile", name: "Mobile App", icon: <Smartphone size={20} /> },
  ];

  const faqs = [
    {
      category: "getting-started",
      question: "How do I create my first study partn