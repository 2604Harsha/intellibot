import os

filepath = r'c:\Users\hp\Downloads\intellibot-main\frontend\features\chat\components\SettingsModal.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make the backdrop darker and more blurred
content = content.replace('bg-black/60 backdrop-blur-sm', 'bg-black/80 backdrop-blur-xl')

# Update modal wrapper
content = content.replace(
    'className="w-full max-w-[850px] h-[75vh] max-h-[800px] bg-[#212121] rounded-2xl shadow-2xl flex overflow-hidden relative font-sans text-[#ECECF1]"',
    'className="w-full max-w-[850px] h-[75vh] max-h-[800px] bg-[#09090B] border border-white/10 rounded-2xl shadow-2xl flex overflow-hidden relative font-sans text-[#ECECF1]"'
)

# Update sidebar
content = content.replace(
    'className="w-[260px] bg-[#171717] flex flex-col"',
    'className="w-[260px] bg-[#09090B] border-r border-white/5 flex flex-col"'
)

# Update active tab
content = content.replace(
    '"bg-[#212121] text-white font-medium"',
    '"bg-white/10 text-white font-medium shadow-sm border border-white/5"'
)

# Update inactive tab
content = content.replace(
    '"text-[#A1A1AA] hover:text-[#ECECF1] hover:bg-[#212121]/50"',
    '"text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"'
)

# Update Content Area background
content = content.replace(
    'className="flex-1 overflow-y-auto scrollbar-premium bg-[#212121]"',
    'className="flex-1 overflow-y-auto scrollbar-premium bg-[#09090B]"'
)

# Globally replace other #171717 with bg-zinc-900 (for inputs and boxes inside content)
content = content.replace('bg-[#171717]', 'bg-zinc-900/50')

# Globally replace #212121 (for options in selects, or other backgrounds)
content = content.replace('bg-[#212121]', 'bg-zinc-900')

# Replace text colors
content = content.replace('text-[#A1A1AA]', 'text-zinc-400')
content = content.replace('text-[#ECECF1]', 'text-zinc-200')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Styles updated!')
