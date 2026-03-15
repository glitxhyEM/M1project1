# Project 01: Photo Journal - Discovery Challenge

## 🎯 Project Overview

Build your first mobile app by combining foundational skills from Activities 01-03: setup, components, and state management. Create a personal photo journal app where users can add entries with captions, view their journal timeline, and manage their thoughts.

**Combines:** Activities 01-03 (Introduction, Components & Styling, State Management)
**Screens:** 3 (List View, Add Entry, Entry Detail)
**Difficulty:** Beginner

## 📚 What's Included (65-70% Complete)

### ✅ Working Features
- Journal entry display in FlatList (Activity 03 pattern)
- Entry card components (Activity 02 pattern)
- Detail view navigation with conditional rendering
- Add entry form UI with TextInputs
- Empty state display
- Responsive button components

### ⚠️ TODOs for You to Complete

**Primary Tasks:**

1. **Implement addEntry Function** (App.js, line ~32)
   - Extract pattern from Activity 03's add todo functionality
   - Validate that title and caption are not empty
   - Create new entry object with unique ID using `Date.now().toString()`
   - Add to entries array using spread operator
   - Clear form inputs and hide form

2. **Implement deleteEntry Function** (Optional challenge)
   - Extract pattern from Activity 03's delete todo functionality
   - Use `filter()` to remove entry by id
   - Update entries state

**Hints:**
- Review Activity 03's `addTodo` function for the add pattern
- Use `setEntries([...entries, newEntry])` to add items
- Use `setEntries(entries.filter(entry => entry.id !== id))` to delete
- Generate unique IDs with `Date.now().toString()`
- Use `new Date().toLocaleDateString()` for dates

## 🚀 Getting Started

### Installation
```bash
npm install --legacy-peer-deps
```

### Run the App
```bash
# Start development server
npx expo start

# Run on web browser (recommended for testing)
npx expo start --web

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android
```

## 📋 Assembly Guide

This project demonstrates how to combine activity templates:

### From Activity 01: Hello Mobile World
- Basic Expo project structure
- View and Text components
- StyleSheet for styling

### From Activity 02: Button Counter
- `ActionButton` component with touch targets
- TouchableOpacity for interactions
- Component composition patterns
- `EntryCard` component for list items

### From Activity 03: Todo List Basic
- useState for managing entries array
- FlatList for rendering lists
- Add/delete item patterns (you'll implement these!)
- Conditional rendering for navigation

## 🧪 Testing Checklist

- [ ] App loads without errors
- [ ] Can view list of sample entries
- [ ] Can tap entry to view details
- [ ] Can navigate back to list
- [ ] Can open add entry form
- [ ] Can cancel add entry form
- [ ] TODO: Can add new entry
- [ ] TODO: New entry appears in list
- [ ] TODO: Form validation prevents empty entries
- [ ] Empty state shows when no entries

## 💡 Learning Objectives

By completing this project, you will:
- ✅ Combine multiple concepts into a cohesive application
- ✅ Extract patterns from activities and reuse them
- ✅ Manage complex state with multiple pieces of data
- ✅ Build reusable components
- ✅ Navigate between views using conditional rendering
- ✅ Handle user input with forms

## 🎓 Next Steps

After completing this project:
1. Test all functionality thoroughly
2. Try the optional extensions below
3. Move on to **Project 02: My Photo Gallery** which adds:
   - Real camera integration (Activity 04)
   - React Navigation library (Activity 05)
   - Data persistence with AsyncStorage (Activity 06)

## 🚀 Optional Extensions

**Beginner:**
- Add entry editing functionality
- Sort entries by date or title
- Add different image URLs

**Intermediate:**
- Add entry categories/tags
- Implement search functionality
- Add character count to caption input

**Advanced:**
- Add animations for screen transitions
- Implement swipe-to-delete
- Add multiple photos per entry

## 📖 Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- Activity 01-03 templates for reference patterns
- Project 01 specification: `../Project/Project 01- Photo Journal (NEW).mdx`

---

**Remember:** This is a learning template with intentional gaps. Completing the TODOs is essential for understanding how to combine activity patterns into projects!
