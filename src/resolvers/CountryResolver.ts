import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Like } from "typeorm";
import Country, {NewCountryInput, UpdateContinentInput} from "../entities/Country";
import { GraphQLError } from "graphql";

@Resolver(Country)
class CountryResolver {

    @Mutation(() => Country)
    async createCountry(
        @Arg("data") data: NewCountryInput
    ) {
        const newCountry = new Country();
        Object.assign(newCountry, data);
        const newCountryWithId = await newCountry.save();
        return newCountryWithId;
    }

    @Query(() => [Country])
    async countries(@Arg("name", { nullable: true }) name: string) {
        const countriesToDisplay = await Country.find({
            where: { name: name ? Like(`%${name}%`) : undefined },
            order: { id: "desc" },
        });

        if (!countriesToDisplay) return new GraphQLError("No country found")

        return countriesToDisplay
    }

    @Query(() => [Country])
    async countriesByCode(@Arg("code", { nullable: true }) code: string) {
        const countryToDisplay = await Country.find({
            where: { code: code ? Like(`%${code}%`) : undefined },
            order: { id: "desc" },
        });

        if (!countryToDisplay) return new GraphQLError("This code doesn't match with any country")

        return countryToDisplay
    }

    @Query(() => [Country])
    async countriesByContinent(@Arg("continent", { nullable: true }) continent: string) {
        const countryToDisplay = await Country.find({
            where: { continent: continent ? Like(`%${continent}%`) : undefined },
            order: { id: "desc" },
        });

        if (!countryToDisplay) return new GraphQLError("This continent doesn't have any country in database")

        return countryToDisplay
    }


    @Mutation(() => Country)
    async updateCountry(
      @Arg("country") id: number,
      @Arg("data") data: UpdateContinentInput) {
      const countryToUpdate = await Country.findOneBy({ id });
      if (!countryToUpdate) throw new GraphQLError("not found");
  
      Object.assign(countryToUpdate, data);
  
      await countryToUpdate.save();
      return Country.findOne({
        where: { id },
      });
    }
}

export default CountryResolver;
