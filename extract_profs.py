with open("courses.txt", "r") as f:
    for line in f:
        if not line.startswith("*"):
            print('"'+line.strip()+'",')
