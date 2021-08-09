package model;

public class CustomerType {
	private String name;
	private double discount;
	private double requiredPoints;
	
	//TODO: kada se uradi serijalizacija treba namestiti generateId() funkciju
	
	public CustomerType(String name) {
		super();
		this.name = name;
		switch (name) {
			case "gold":
				this.discount = 10;
				this.requiredPoints = 1500;
				break;
			case "silver":
				this.discount = 7;
				this.requiredPoints = 1000;
				break;
			case "bronze":
				this.discount = 5;
				this.requiredPoints = 500;
				break;
		}
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public double getRequiredPoints() {
		return requiredPoints;
	}

	public void setRequiredPoints(double requiredPoints) {
		this.requiredPoints = requiredPoints;
	}
	
	
}
