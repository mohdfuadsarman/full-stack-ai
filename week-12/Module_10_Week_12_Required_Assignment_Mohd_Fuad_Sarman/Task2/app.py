from flask import Flask, render_template, request, abort
from db import database as db

app = Flask(__name__)



@app.route('/')
def index():
    try:
        pets = db.get_all_pets()
        if not pets:
            print('No pets found in the database')
        else:
            print(f'Found {len(pets)} pets in the database:', pets)
        return render_template('index.html', title='Pet List', pets=pets)
    except Exception as err:
        return f'Failed to fetch pets with error: {err}', 500

@app.route('/pets/<int:pet_id>')
def pet_by_id(pet_id):
    try:
        pet = db.get_pet_by_id(pet_id)
        if pet:
            print(f'Found pet with ID {pet_id}:', pet)
            return render_template('index.html', title='Pet Detail', pets=[pet])
        else:
            abort(404, f'Pet with ID {pet_id} not found')
    except Exception as err:
        return f'Failed to fetch pet with error: {err}', 500

@app.route('/pets/name/<name>')
def pet_by_name(name):
    try:
        pets = db.get_pets_by_name(name)
        if pets:
            print(f'Found pet with name {name}:', pets)
            return render_template('index.html', title='Pet Detail', pets=pets)
        else:
            abort(404, f'Pet with name {name} not found')
    except Exception as err:
        return f'Failed to fetch pet with error: {err}', 500

@app.route('/pets/type/<type>')
def pet_by_type(type):
    try:
        pets = db.get_pets_by_type(type)
        if pets:
            print(f'Found {len(pets)} pets of type {type}:', pets)
            return render_template('index.html', title='Pet Type', pets=pets)
        else:
            abort(404, f'No pets found of type {type}')
    except Exception as err:
        return f'Failed to fetch pets by type with error: {err}', 500

@app.route('/pets/age/age', methods=['GET'])
def pet_by_age():
    min_age = request.form.get('minAge', type=int)
    max_age = request.form.get('maxAge', type=int)
    try:
        pets = db.get_pets_by_age_range(min_age, max_age)
        if pets:
            print(f'Found {len(pets)} pets in age range {min_age}-{max_age}:', pets)
            return render_template('index.html', title='Pet Age Range', pets=pets)
        else:
            abort(404, f'No pets found in age range {min_age}-{max_age}')
    except Exception as err:
        return f'Failed to fetch pets by age range with error: {err}', 500

@app.route('/pets/owner/<owner>')
def pet_by_owner(owner):
    try:
        pets = db.get_pets_by_owner(owner)
        if pets:
            print(f'Found {len(pets)} pets owned by {owner}:', pets)
            return render_template('index.html', title='Pet Owner', pets=pets)
        else:
            print(f'No pets found owned by {owner}')
            abort(404, f'No pets found owned by {owner}')
    except Exception as err:
        return f'Failed to fetch pets by owner with error: {err}', 500

@app.route('/create', methods=['POST'])
def create_pet():
    name = request.form.get('name')
    type_ = request.form.get('type')
    age = request.form.get('age')
    owner = request.form.get('owner')
    try:
        pet = db.create_pet(name, type_, age, owner)
        if not pet:
            return 'Failed to create pet.', 400
        return 'Pet created successfully', 201
    except Exception as err:
        return f'Failed to create pet with error: {err}', 500

@app.route('/update/<int:pet_id>', methods=['POST'])
def update_pet(pet_id):
    name = request.form.get('name')
    type_ = request.form.get('type')
    age = request.form.get('age')
    owner = request.form.get('owner')
    try:
        updated_pet = db.update_pet(pet_id, name, type_, age, owner)
        if updated_pet and updated_pet['changes'] > 0:
            return 'Pet updated successfully', 200
        else:
            return f'Pet with ID {pet_id} not found or no changes made', 404
    except Exception as err:
        return f'Failed to update pet with error: {err}', 500

@app.route('/delete/<int:pet_id>', methods=['POST'])
def delete_pet(pet_id):
    try:
        result = db.delete_pet(pet_id)
        if result and result['changes'] > 0:
            return 'Pet deleted successfully', 200
        else:
            return 'Pet not found', 404
    except Exception as err:
        return 'Error deleting pet', 500

@app.route('/clear', methods=['POST'])
def clear_pets():
    try:
        db.clear_all_pets()
        return 'All pets cleared successfully', 200
    except Exception as err:
        return 'Error clearing pets', 500

@app.route('/reset', methods=['POST'])
def reset_db():
    try:
        db.reset_pets_table()
        return 'Database reset successfully', 200
    except Exception as err:
        return 'Error resetting database', 500

if __name__ == '__main__':
    app.run(port=3000, debug=True)
