import sys
import speech_recognition as recognition

if len(sys.argv) < 2:
  sys.exit()

file = sys.argv[1]

recognizer = recognition.Recognizer()

audioFile = recognition.AudioFile(file)

with audioFile as source:
  data = recognizer.record(source)

transcript = recognizer.recognize_google(data, key=None)

print(transcript)
